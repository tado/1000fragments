uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.78 + sin(p.y * 2.49 + t * 1.25) * 1.01 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 3.05;
	p = fract(p * 1.65) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.20, vec3(0.43, 0.42, 0.48), vec3(0.44, 0.49, 0.41), vec3(1.27, 0.89, 0.78), vec3(0.99, 0.46, 0.38));
	col = mod(col * 2.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
