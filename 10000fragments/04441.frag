uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.50, 0.0)) * 38.34 - t * 2.14 + ph);
    float mb = sin(length(p + vec2(0.50, 0.0)) * 13.51 - t * 2.14 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.59;
	p *= 3.01;
	p = rot2(time * 0.81) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.61), field(p, time, 1.22));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
