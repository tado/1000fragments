uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 37.54 - t * 7.77 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 39.82 - t * 4.44 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.50;
	{ p = vec2(atan(p.y, p.x) * 2.92, length(p) * 4.42 - time * 0.83); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.93, lr * 2.40 + time * -0.80); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.28, 0.51, 0.92) * (0.09 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
