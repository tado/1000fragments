uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 13.08 + t * 2.03 + ph) + sin(p.y * 13.24 - t * 2.35 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	p = rot2(p.y * -2.10 + time * 0.97) * p;
	p.y += sin(p.x * 4.26 + time * 3.52) * 0.16;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.39; p = rot2(1.93) * p; }
	p = fract(p * 2.18) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.34), field(p, time, 2.68));
	col = 0.5 + 0.5 * col;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
