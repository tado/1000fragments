uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 30.93 - t * 2.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.68;
	p = rot2(p.y * 2.00 + time * 0.40) * p;
	p.y += sin(p.x * 2.31 + time * 3.17) * 0.12;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.27; p = rot2(0.72) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.73, 0.20, 0.41) * (0.24 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
