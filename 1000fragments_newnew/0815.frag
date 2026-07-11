uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 2.82 * sin(t * 0.50) + t * 2.04 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.46;
	float d = field(p, (time * 0.76), 0.0);
	vec3 col = palette(d * 0.46 + (time * 0.76) * 0.13, vec3(0.29, 0.24, 0.32), vec3(0.21, 0.17, 0.19), vec3(0.61, 0.63, 0.51), vec3(0.11, 0.70, 0.84));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.89));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.994, 1.038) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
