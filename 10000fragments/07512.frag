uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.85;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.38)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 21.81 - t * 6.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.84) * p * 18.36;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.01, 0.14, 0.04), vec3(0.70, 0.99, 0.77), v);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
