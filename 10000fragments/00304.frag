uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.33 + t * 2.91 + ph) + sin(p.y * 17.44 - t * 2.09 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.28;
	p = rot2(length(p) * -3.72 + time * 0.85) * p;
	p += vec2(-0.17, -0.71) * sin(length(p) * 4.19 - time * 0.93) * 0.21;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.15, 0.07, 0.56), vec3(0.96, 0.84, 0.91), d);
	col = fract(col * 1.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
