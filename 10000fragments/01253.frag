uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.50 + t * 2.07 + ph) + sin(p.y * 7.29 - t * 2.07 + ph)
        + sin((p.x + p.y) * 5.55 + t * 2.07 + ph) + sin(length(p) * 15.28 - t * 2.07 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.51;
	p = rot2(time * -0.94) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.35, 0.56), vec3(0.54, 0.88, 0.88), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
