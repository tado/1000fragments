uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.88 + t * 1.17 + ph) + sin(p.y * 7.29 - t * 0.55 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	p = rot2(length(p) * -3.56 + time * 0.78) * p;
	p = rot2(time * -0.31) * p;
	p += vec2(0.17, 0.22) * sin(length(p) * 5.22 - time * 0.85) * 0.10;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.76));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
