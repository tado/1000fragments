uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 3.57; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 8.55 - t * 3.97 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.71;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 3.47 * p.y + time * 1.01); p.y += 0.37 / wf * cos(wf * 3.61 * p.x + time * 1.99); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.76));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
