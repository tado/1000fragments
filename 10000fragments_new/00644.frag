uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 36.02 - t * 5.72 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 18.63 - t * 4.23 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(p.y * 2.94 + time * 0.74) * p;
	p = rot2(length(p) * 1.36 + time * 0.33) * p;
	p = (floor(p * 20.1) + 0.5) / 20.1;
	p = rot2(time * -1.47) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.50));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
