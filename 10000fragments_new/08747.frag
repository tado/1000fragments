uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 19.68 - t * 2.35 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 34.71 - t * 7.54 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	p = rot2(p.y * -1.19 + time * 0.42) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.55, 0.21, 0.31) * (0.09 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col = mod(col * 2.57, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
