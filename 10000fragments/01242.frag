uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.29 + sr * 10.43 - t * 1.24 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.11 + sin(p.y * 4.92 + t * 1.09) * 3.42 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.62;
	p = fract(p * 1.31) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.22);
	float d = d1 * d2;
	vec3 col = palette(d * 0.65 + time * 0.17, vec3(0.51, 0.51, 0.50), vec3(0.40, 0.48, 0.35), vec3(1.22, 1.37, 1.22), vec3(0.47, 0.62, 0.98));
	col = mod(col * 1.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
