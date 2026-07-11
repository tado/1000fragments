uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.37 + sin(p.y * 4.08 + t * 1.66) * 3.25 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 1.30 + time * 0.54) * p;
	p.x += sin(p.y * 4.69 + time * 1.79) * 0.16;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 3.15 * p.y + time * 1.96); p.y += 0.26 / wf * cos(wf * 2.52 * p.x + time * 0.92); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.56), field(p, time, 1.11));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
