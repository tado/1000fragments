uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.00 + vec2(t * 0.57, -t * 0.57) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p) - 0.70;
	p = rot2(time * -1.32) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.31, 1.56, 1.59) + vec3(0.01, 0.21, 0.23);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
