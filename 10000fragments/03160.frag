uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.57) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 0.67 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.52 + sin(p.y * 1.43 + t * 4.71) * 4.24 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.00);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.51 + time * 0.09, vec3(0.56, 0.44, 0.54), vec3(0.50, 0.38, 0.36), vec3(0.85, 1.20, 1.35), vec3(0.74, 0.59, 0.93));
	col = fract(col * 1.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
