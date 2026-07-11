uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.45 + ga * 3.0 - t * 2.67 + ph);
    v = arm * exp(-gr * 1.30);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.27 / 3.1415927, 1.39 / r - (time * 0.61) * 1.74);
	float d = field(tv, (time * 0.61), 0.0);
	vec3 col = palette((d) * 0.89 + (time * 0.61) * 0.11, vec3(0.30, 0.35, 0.33), vec3(0.19, 0.19, 0.17), vec3(0.81, 0.84, 0.59), vec3(0.64, 0.66, 0.05));
	col *= clamp(r * 2.85, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.935, 0.975, 1.040) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
