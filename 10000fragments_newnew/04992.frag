uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 7.79; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 17.74 - t * 1.87 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.46;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.50; p = rot2(1.66) * p; }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.84;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.49 * p.y + time * 1.85); p.y += 0.36 / wf * cos(wf * 3.30 * p.x + time * 0.98); }
	p += vec2(0.56, -0.08) * sin(length(p) * 4.31 - time * 2.28) * 0.37;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.99 + time * 0.18);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.74 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
