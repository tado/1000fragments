uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.79 + vec2(t * 2.21, -t * 2.21) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.73;
	p = fract(p * 2.53) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.63 + time * 0.03, vec3(0.48, 0.49, 0.47), vec3(0.39, 0.44, 0.42), vec3(0.73, 0.70, 1.37), vec3(0.03, 0.50, 0.42));
	col = mod(col * 2.98, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
