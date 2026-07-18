uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.73;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.89)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 10.38 - t * 7.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.42) - 0.5;
	p = rot2(p.y * 1.63 + (time * 0.60) * 0.26) * p;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.77; }
	float d = clamp(0.5 + 0.5 * field(p, (time * 0.60), 0.0), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.000, 0.041, 0.048), vec3(0.266, 0.306, 0.728), smoothstep(0.0, 0.62, d)), vec3(0.619, 0.940, 1.000), smoothstep(0.62, 1.0, d));
	col = clamp((col - 0.5) * 1.60 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.051, 0.995, 0.926);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
