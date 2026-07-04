uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 3.88;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.87) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.25) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.74), cos(time * 1.12)) * 0.10;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.42 / 3.1415927, 1.38 / r - time * 2.88);
	tv.x += tv.y * 0.16;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.85 + time * 0.06, vec3(0.49, 0.51, 0.57), vec3(0.46, 0.30, 0.32), vec3(1.33, 0.80, 1.02), vec3(0.91, 0.25, 0.60));
	col *= clamp(r * 1.35, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
