uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 14.81 - t * 7.87 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 39.54 - t * 7.87 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.58 + time * 0.37) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.05, 1.45, 0.64) + vec3(0.20, 0.28, 0.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
