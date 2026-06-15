uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 15.78 - t * 4.13 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.60;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.55; p = rot2(1.99) * p; }
	p = rot2(time * 0.92) * p;
	p += vec2(-0.71, 0.71) * sin(length(p) * 3.70 - time * 0.64) * 0.20;
	p = rot2(1.54) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.08), field(p, time, 2.15));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
