uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 5.82;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.20)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 19.01 - t * 6.33 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	p = sin(p * 2.80 + time * 1.22) * 1.09;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.69));
	p += vec2(0.85, -0.56) * sin(length(p) * 2.90 - time * 1.09) * 0.21;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.31, 0.54, 0.31) * (0.10 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
