uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 9.58; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 28.43 - t * 3.99 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.59;
	p = rot2(length(p) * -2.27 + time * 0.62) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.58, lr * 1.06 + time * 0.56); }
	p = (floor(p * 21.1) + 0.5) / 21.1;
	{ p = vec2(atan(p.y, p.x) * 1.70, length(p) * 4.83 - time * 0.43); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.95, 0.62, 0.64) * (0.14 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
