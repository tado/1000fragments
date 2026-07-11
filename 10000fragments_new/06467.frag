uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.95);
    float gsh = hash21(vec2(grow, floor(t * 5.03))) - 0.5;
    float gx = p.x + gsh * 0.85;
    v = sin(gx * 14.99 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 4.44));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 4.67;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.33)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 15.47 - t * 5.50 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.72;
	vec2 q1 = p; vec2 q2 = p;
	q2 = rot2(length(q2) * 3.96 + time * 0.98) * q2;
	q2.y += sin(q2.x * 6.98 + time * 2.09) * 0.11;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.83);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.53));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.29 + time * 0.36);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
