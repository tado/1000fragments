uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.39) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 3.97 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p += vec2(0.64, 0.66) * sin(length(p) * 4.71 - time * 0.77) * 0.21;
	p = rot2(1.98) * p;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.66), field(p, time, 1.32));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
