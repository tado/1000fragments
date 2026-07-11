uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 30.57 - t * 6.65 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 23.19 - t * 1.41 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.48), cos(time * 0.88)) * 0.07;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.71 / 3.1415927, 1.48 / r - time * 0.87);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.32, vec3(0.41, 0.57, 0.54), vec3(0.36, 0.41, 0.37), vec3(0.99, 1.14, 1.35), vec3(0.43, 0.51, 0.06));
	col *= clamp(r * 2.81, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
