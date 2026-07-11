uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.57 + vec2(t * 1.06, -t * 0.61) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.40, lr * 1.80 + time * -0.47); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.69 + time * 0.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
