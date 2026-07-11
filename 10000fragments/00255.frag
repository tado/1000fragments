uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.29 + t * 4.72 + ph) + sin(p.y * 16.88 - t * 4.97 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.94;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.52, lr * 1.47 + time * 0.69); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.14 + time * 0.01);
	col = fract(col * 2.41);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
