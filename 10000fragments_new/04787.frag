uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 29.22 - t * 5.94 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 28.33 - t * 1.87 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.67 / 3.1415927, 0.43 / r + time * 1.66);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.27, vec3(0.56, 0.48, 0.59), vec3(0.33, 0.49, 0.33), vec3(1.35, 1.04, 1.17), vec3(0.19, 0.33, 0.65));
	col *= clamp(r * 2.87, 0.0, 1.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.37 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
