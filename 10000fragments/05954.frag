uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.29;
    v = 0.5 * (sin(6.0 * cp.x + t * 1.54) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 2.67) * sin(6.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.85 / 3.1415927, 1.49 / r - time * 1.34);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.19, vec3(0.52, 0.44, 0.57), vec3(0.31, 0.34, 0.35), vec3(0.84, 0.84, 1.29), vec3(0.45, 0.99, 0.85));
	col *= clamp(r * 2.94, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
