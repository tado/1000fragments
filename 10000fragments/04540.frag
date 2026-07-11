uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 15.39 - t * 1.47 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 18.39 - t * 1.47 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.59;
	p = rot2(p.y * 2.72 + time * 0.47) * p;
	p = abs(p);
	p = rot2(2.84) * p;
	p += vec2(-0.39, -0.37) * sin(length(p) * 5.10 - time * 0.63) * 0.33;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.79), field(p, time, 1.58));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
