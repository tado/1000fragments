uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 27.06 - t * 1.62 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 8.78 - t * 2.76 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.14;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.10 / 3.1415927, 0.90 / r - time * 0.78);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.33 + time * 0.15, vec3(0.47, 0.56, 0.57), vec3(0.49, 0.43, 0.31), vec3(1.23, 1.25, 0.84), vec3(0.07, 0.28, 0.09));
	col *= clamp(r * 1.53, 0.0, 1.0);
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
