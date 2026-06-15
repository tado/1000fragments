uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 30.49 - t * 2.92 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 30.74 - t * 2.92 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.84;
	p = rot2(length(p) * -3.48 + time * 1.04) * p;
	p += vec2(-0.25, 0.97) * sin(length(p) * 5.72 - time * 1.32) * 0.20;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.70), field(p, time, 1.40));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
