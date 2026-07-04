uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.36;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.99) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 1.88) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.16, lr * 2.54 + time * 0.47); }
	p = sin(p * 2.85 + time * 1.03) * 1.10;
	p = rot2(length(p) * 1.17 + time * 0.58) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.91), field(p, time, 1.83));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
