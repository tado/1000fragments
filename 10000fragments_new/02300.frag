uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.58 + 0.26 * pow(abs(cos(ra * 2.0 + t * 2.32)), 1.62);
    v = sin((rr - pet) * 13.05 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.27 + t * 3.96 + ph) + sin(p.y * 10.06 - t * 3.74 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.92;
	p = (floor(p * 18.8) + 0.5) / 18.8;
	p = fract(p * 1.19) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.57);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.85 + time * 0.04, vec3(0.51, 0.41, 0.56), vec3(0.46, 0.44, 0.36), vec3(0.99, 1.09, 1.20), vec3(0.42, 0.07, 0.08));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
