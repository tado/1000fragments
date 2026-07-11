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
    float arm = sin(log(gr) * 7.40 + ga * 3.0 - t * 2.72 + ph);
    v = arm * exp(-gr * 1.12);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.07 + t * 0.48) - 0.5) * 2.0;
    v = sin((p.y * 7.18 + zx * 1.93 + t * 0.68) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 6.32 + (time * 0.72) * 2.16) * 0.12;
	p = sin(p * 1.40 + (time * 0.72) * 0.53) * 0.90;
	float d1 = field(p, (time * 0.72), 0.0);
	float d2 = field2(p, (time * 0.72), 1.37);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.20 + (time * 0.72) * 0.00, vec3(0.32, 0.32, 0.36), vec3(0.24, 0.22, 0.19), vec3(0.79, 0.55, 0.51), vec3(0.35, 0.97, 0.50));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.86));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.948, 0.964, 1.023) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
