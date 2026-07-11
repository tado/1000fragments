uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.94 + jf * 4.0), cos(t * 0.23 * jf)) * 0.55;
        xs += sin(length(p - im) * 216.05 - t * 12.12 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.19; p = rot2(1.75) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.20 / wf * sin(wf * 2.76 * p.y + time * 0.89); p.y += 0.26 / wf * cos(wf * 3.28 * p.x + time * 1.36); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.55), field(p, time, 1.10));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
