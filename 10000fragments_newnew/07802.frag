uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 27.18 - t * 1.59 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.97;
	p = abs(p);
	p = rot2(length(p) * -3.33 + time * 0.54) * p;
	p = rot2(0.44) * p;
	p.y += sin(p.x * 6.11 + time * 3.52) * 0.26;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.51, 1.37, 0.78) + vec3(0.17, 0.23, 0.07);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.93));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
