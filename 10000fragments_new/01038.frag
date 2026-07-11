uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.27, 0.0)) * 8.46 - t * 4.83 + ph);
    float mb = sin(length(p + vec2(0.27, 0.0)) * 30.58 - t * 5.07 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 1.10 + time * -0.60); }
	p.y += sin(p.x * 5.88 + time * 2.04) * 0.16;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.73 + time * 0.22, vec3(0.44, 0.51, 0.54), vec3(0.31, 0.42, 0.42), vec3(1.25, 0.97, 0.98), vec3(0.89, 0.23, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
