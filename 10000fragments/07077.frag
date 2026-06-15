uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.32 + t * 0.64 + ph) + sin(p.y * 6.03 - t * 0.64 + ph)
        + sin((p.x + p.y) * 3.93 + t * 0.64 + ph) + sin(length(p) * 10.04 - t * 0.64 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.40;
	p = rot2(p.y * 3.03 + time * 0.85) * p;
	p += vec2(-0.84, -0.10) * sin(length(p) * 2.75 - time * 1.60) * 0.11;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.11, 0.56, 1.26) + vec3(0.02, 0.16, 0.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
