uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 19.58 - t * 5.65 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 18.43 - t * 4.37 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.51;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.57 / 3.1415927, 1.22 / r - time * 2.88);
	tv.x += tv.y * 0.22;
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.41 + time * 0.32, vec3(0.52, 0.54, 0.53), vec3(0.45, 0.32, 0.38), vec3(1.19, 1.06, 0.98), vec3(0.97, 0.35, 0.91));
	col *= clamp(r * 2.36, 0.0, 1.0);
	col = fract(col * 1.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
