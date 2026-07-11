uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 8.30; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 24.34 - t * 2.27 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.22; p = rot2(2.43) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.74 * p.y + time * 0.95); p.y += 0.36 / wf * cos(wf * 2.60 * p.x + time * 2.10); }
	p = (floor(p * 8.9) + 0.5) / 8.9;
	{ p = vec2(atan(p.y, p.x) * 1.29, length(p) * 2.54 - time * 0.98); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.71, 0.55, 1.55) + vec3(0.04, 0.08, 0.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
