uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 5.16; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 12.16 - t * 3.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(length(p) * 2.73 + (time * 0.68) * 1.40) * p;
	p *= 1.24;
	p = rot2((time * 0.68) * -0.61) * p;
	{ float fr = length(p); p *= 1.0 + -0.25 * fr * fr; }
	float d = field(p, (time * 0.68), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.42, 0.43, 0.45) + vec3(0.04, 0.03, 0.04);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.963, 0.997, 0.949) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
