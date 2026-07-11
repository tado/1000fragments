uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.60 + jf * 4.0), cos(t * 0.14 * jf)) * 0.80;
        xs += sin(length(p - im) * 198.52 - t * 8.47 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.76 * p.y + time * 0.79); p.y += 0.44 / wf * cos(wf * 3.49 * p.x + time * 0.75); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.45; p = rot2(0.31) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.76, length(p) * 4.17 - time * 0.59); }
	p = fract(p * 2.52) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.41));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
