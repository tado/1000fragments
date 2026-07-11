uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.71 + t * 3.09 + ph) * 0.7;
    float wb = sin(p.y * 16.26 - t * 3.25 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.50;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.33;
	p = (floor(p * 13.8) + 0.5) / 13.8;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.45, lr * 2.60 + time * -0.89); }
	p = rot2(length(p) * -1.93 + time * 0.83) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.09), field(p, time, 2.17));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
