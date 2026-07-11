uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.10 + t * 3.91 + ph) + sin(p.y * 15.96 - t * 0.56 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.83;
	p = rot2(length(p) * -1.81 + time * 0.21) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.28, 0.18, 0.24), vec3(0.64, 0.63, 0.48), d);
	col = mod(col * 1.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
