uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.81 + sr * 8.85 - t * 1.10 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 1.80 + time * 0.84) * p;
	p = (floor(p * 16.8) + 0.5) / 16.8;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.97, 0.17, 0.83) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 1.70, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
