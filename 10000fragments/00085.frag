uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.44 + t * 4.67 + ph) + sin(p.y * 15.96 - t * 3.34 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.85;
	p = rot2(1.60) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.38, 0.43, 0.31), vec3(0.89, 0.74, 0.77), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
