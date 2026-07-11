uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 10.21 + t * 2.48 + ph) * 0.7;
    float wb = sin(p.y * 19.43 - t * 2.08 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.27;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.25) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.18, 0.66, 1.59) + vec3(0.07, 0.12, 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
