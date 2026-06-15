uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 18.58 - t * 4.57 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 10.88 - t * 4.57 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.76;
	p = rot2(time * 0.86) * p;
	p = rot2(p.y * -2.08 + time * 0.52) * p;
	p *= 3.02;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.11, 0.39), vec3(0.89, 0.58, 0.56), d);
	col = fract(col * 1.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
