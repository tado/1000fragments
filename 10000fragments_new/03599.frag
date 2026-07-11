uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 4.10 + sin(p.y * 5.30 + t * 4.18) * 2.18 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.66, -0.76) * sin(length(p) * 4.92 - time * 1.26) * 0.36;
	p = rot2(time * 1.17) * p;
	p *= 3.05;
	p = rot2(p.y * -1.65 + time * 0.89) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.04, 0.48, 0.17), vec3(0.79, 0.81, 0.83), d);
	col = mod(col * 1.38, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
